import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { nftSchema} from "./graphql/schemas/nft.schema";
 import connetdb from "./config/connectdb";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());

const corsOptions = {
  origin: "https://leox-multi.vercel.app", 
  credentials: true, // enable CORS with credentials
};
app.use(cors(corsOptions));
// Main backend data
app.get("/", (req, res) => {
  res.send("Welcome to the GraphQL API!");
});
app.use(
  "/g",
  graphqlHTTP({
    schema: nftSchema,
    graphiql: true,
  })
);

const start = async () => {
  try {
    await connetdb()
    app.listen(PORT, () => {
      console.log(`Server is running....`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
