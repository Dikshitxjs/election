declare module "@fingerprintjs/fingerprintjs" {
  type VisitorResult = {
    visitorId: string;
    [key: string]: any;
  };

  type FingerprintJSStatic = {
    load: () => Promise<{ get: () => Promise<VisitorResult> }>;
  };

  const FingerprintJS: FingerprintJSStatic;
  export default FingerprintJS;
}
