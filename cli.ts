import { Command } from 'https://deno.land/x/cliffy/command.ts';
import { SizeType } from "./mod.ts";

interface CommandOptionsType {
  format?: string
  decimal?: number
}

await new Command()
    .name( 'deno.report cli' )
    .version( '0.1.0' )
    .description( `CLI for checking a deno module's bundle size.` )
    .arguments('<module_uri>')
    .option('-f, --format <type:string>', 'The size format to output the bundles size as (ex. "kb", "Gb", "TB")')
    .option('-d, --decimal <type:number>', 'The number of decimal places to round the number to.')
    .action( async ( options: CommandOptionsType, uri: string ) => {
      const {bundleRemote, getBundleSizeFromBlob, formatBundleSize} = await import('./mod.ts');
      const [_, bundle] = await bundleRemote(uri);
      const bundleSize = getBundleSizeFromBlob(bundle);
      if (options?.format) {
        let fmt = options.format.toLowerCase() as SizeType;
        if (!fmt) {
          console.log(formatBundleSize(bundleSize))
        } else {
          if (options?.decimal) {
            console.log(formatBundleSize(bundleSize, fmt, options.decimal))
          } else {
            console.log(formatBundleSize(bundleSize, fmt))
          }
        }
      }
      else console.log(formatBundleSize(bundleSize))

    })
    .parse(Deno.args);
