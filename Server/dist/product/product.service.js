"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.getProductService = void 0;
const product_repository_1 = require("./product.repository");
const cursor_1 = require("../common/utils/cursor");
const cacheInvalidations_1 = require("../analytics/cacheInvalidations");
const appError_1 = __importDefault(require("../common/error/appError"));
const getProductService = async (query) => {
    const limit = Math.min(Number(query.limit) || 10, 100);
    // Decode cursors EARLY (service responsibility)
    const after = query.after ? (0, cursor_1.decodeCursor)(query.after) : undefined;
    const before = query.before ? (0, cursor_1.decodeCursor)(query.before) : undefined;
    if (after && before) {
        throw new appError_1.default("Cannot use both 'after' and 'before'");
    }
    const minPrice = query.minPrice !== undefined
        ? Number(query.minPrice)
        : undefined;
    const maxPrice = query.maxPrice !== undefined
        ? Number(query.maxPrice)
        : undefined;
    const products = await (0, product_repository_1.findProducts)({
        limit: limit + 1,
        after,
        before,
        search: query.search,
        minPrice,
        maxPrice,
        isActive: query.isActive !== undefined
            ? query.isActive === "true"
            : undefined,
    });
    const hasMore = products.length > limit;
    if (hasMore) {
        if (before) {
            // backward pagination → remove first item
            products.shift();
        }
        else {
            // forward pagination → remove last item
            products.pop();
        }
    }
    // cursors
    let nextCursor = null;
    let prevCursor = null;
    if (after) {
        nextCursor = hasMore ? (0, cursor_1.encodeCursor)(products[products.length - 1]) : null;
        prevCursor = products.length ? (0, cursor_1.encodeCursor)(products[0]) : null;
    }
    else if (before) {
        nextCursor = products.length ? (0, cursor_1.encodeCursor)(products[products.length - 1]) : null;
        prevCursor = hasMore ? (0, cursor_1.encodeCursor)(products[0]) : null;
    }
    else {
        // first page
        nextCursor = hasMore ? (0, cursor_1.encodeCursor)(products[products.length - 1]) : null;
        prevCursor = null;
    }
    return {
        data: products,
        meta: {
            limit,
            nextCursor,
            prevCursor,
            hasMore,
        },
    };
};
exports.getProductService = getProductService;
const createProductService = async (data) => {
    const product = await (0, product_repository_1.createProduct)(data);
    await (0, cacheInvalidations_1.invalidateAnalyticsCache)();
    return product;
};
exports.createProductService = createProductService;
const updateProductService = async (id, data) => {
    const updateproduct = await (0, product_repository_1.updateProduct)(id, data);
    await (0, cacheInvalidations_1.invalidateAnalyticsCache)();
    return updateproduct;
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    const deleteproduct = await (0, product_repository_1.softDeleteProduct)(id);
    await (0, cacheInvalidations_1.invalidateAnalyticsCache)();
    return deleteproduct;
};
exports.deleteProductService = deleteProductService;
