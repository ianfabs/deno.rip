import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { bundleRemote, formatBundleSize, getBundleSizeFromBlob } from "./mod.ts";

const app = new Application();

const router = new Router();

router.get('/', (ctx) => {

})

router.get('/check', async (ctx) => {
  let query = new URLSearchParams(ctx.request.url.search);
  let bundle: string | undefined;

  const slug = query.get("slug"), uri = query.get("uri");

  if (slug) bundle = (await bundleRemote(`https://deno.land/${slug}`))[1];
  else if (uri) bundle = (await bundleRemote(uri))[1];

  if (bundle) {
    ctx.response.body = formatBundleSize(getBundleSizeFromBlob(bundle))
  } else {
    ctx.response.body = "Invalid Request!"
  }
  
});

app.use(router.allowedMethods())
app.use(router.routes())

await app.listen({ port: 8000 });