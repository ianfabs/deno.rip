import { filesize } from "https://deno.land/x/filesize/mod.ts";

type BundleReturnType = ReturnType<typeof Deno.bundle>;
// type SizeType = "b" | "kb" | "mb" | "gb" | "tb" | "pb" | "eb" | "yb" | "zb";


const bundleRemote: (uri: string) => BundleReturnType = async (uri: string) => Deno.bundle(uri);
const getBundleSizeFromBlob = (bundle: string) => new Blob([bundle]).size;

const sizeMultipliers = {
  "b": 0,
  "kb": 1,
  "mb": 2,
  "gb": 3,
  "tb": 4,
  "pb": 5,
  "eb": 6,
  "yb": 7,
  "zb": 8,
};
type SizeType = keyof (typeof sizeMultipliers);

const formatBundleSize = (bytes: number, type?: SizeType, decimalPlace?: number) => {
  if (type) {
    let specificMultiplier = sizeMultipliers[type];
    let size = (bytes / (1024 ** specificMultiplier));
    let fixed = size.toFixed(decimalPlace ?? ((<unknown>size.toFixed(1) as number) <= 0.1 ? specificMultiplier+2 : 1))
    return `${fixed} ${type}`;
  } else {
    return filesize(bytes);
  }
};

export {
  bundleRemote,
  getBundleSizeFromBlob,
  BundleReturnType,
  formatBundleSize,
  SizeType
}