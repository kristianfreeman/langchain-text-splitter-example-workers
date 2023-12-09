import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Hono } from "hono";

import template from "./template.html";

const app = new Hono();

app.get("/", (c) => c.html(template));

app.post("/", async (c) => {
  const splitter = new RecursiveCharacterTextSplitter({
		// Customizable options for the splitter
    // chunkSize: 10,
    // chunkOverlap: 1,
  });

  const text = await c.req.text();
  const output = await splitter.createDocuments([text]);

  return c.json(output);
});

export default app;
