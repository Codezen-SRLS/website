interface ImportMetaEnv {
  readonly GA_TRACKING_ID?: string;
  readonly GATSBY_CLARITY_ID?: string;
  readonly GATSBY_EMAILJS_SERVICE_ID: string;
  readonly GATSBY_EMAILJS_TEMPLATE_ID: string;
  readonly GATSBY_EMAILJS_PUBLIC_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
