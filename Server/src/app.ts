import express from "express"
import cors from "cors"
import correlationId from "./common/correlation/correlationId"
import errorHandler from "./common/error/errorHandler"
import authRouter from "./auth/auth.routes"
import userRouter from "./user/user.routes"
import Productrouter from "./product/product.routes"
import orderRouter from "./order/order.routes"
import analyticsRouter from "./analytics/analytics.router"
import { rateLimitMiddleware } from "./common/middleware/rateLimiting/rateLimitingMiddleware"

const app = express()

app.use(cors())
app.use(express.json())
app.use (correlationId);

app.use(rateLimitMiddleware)
app.use("/auth" , authRouter )
app.use("/users",userRouter)
app.use("/product" ,Productrouter )
app.use("/orders",orderRouter)
app.use("/analytics" ,analyticsRouter)
app.use(errorHandler);

export default app;

