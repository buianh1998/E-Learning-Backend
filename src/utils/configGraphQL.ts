import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
// create graphql schema
const schema = buildSchema(`
    type Query{
        hello: String
    }
`);
// root resolver
const root = {
  hello: "Hello world",
};
export const createGraphSchema = (app) => {
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
};
