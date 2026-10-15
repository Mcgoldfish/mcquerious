/** Resolve public files relative to the deployed app, including GitHub project URLs. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
