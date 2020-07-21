import * as rip from "../mod.ts";
import { expect, it } from "https://deno.land/x/expect/mod.ts";
import { writeFileStr } from "https://deno.land/std/fs/write_file_str.ts";

const TEST_MODULE__URI = "https://deno.land/std/http/mod.ts";

const [_, bundle] = await rip.bundleRemote(TEST_MODULE__URI);
await writeFileStr('bundle.js', bundle);

let result: number;

it(
  'should get bundle size from blob',
  async () => {
    let method = rip.getBundleSizeFromBlob;
    result = method(bundle);
    expect(result).toBeDefined();
  }
);

// Get file actual bytes
const {size: bundleSize} = await Deno.lstat("./bundle.js");

it(
  'should produce correct bundle size',
  () => {
    expect(result).toEqual(bundleSize);
  }
);


