import type { Resolver } from "react-hook-form";
import type { ContactFormValues } from "./contact-schema";

/**
 * Lazy react-hook-form resolver for the contact form.
 *
 * Zod and the schema are only needed once a visitor interacts with the form,
 * so they are split out of the initial bundle and fetched on first use
 * (or earlier, via `preloadContactResolver` when the form gains focus).
 * Validation rules and messages are unchanged: it is the same zodResolver
 * over the same shared schema the API route uses.
 */
let resolverPromise: Promise<Resolver<ContactFormValues>> | undefined;

function loadResolver() {
  resolverPromise ??= Promise.all([import("@hookform/resolvers/zod"), import("./contact-schema")]).then(
    ([{ zodResolver }, { contactSchema }]) => zodResolver(contactSchema) as Resolver<ContactFormValues>,
  );
  return resolverPromise;
}

export function preloadContactResolver() {
  void loadResolver();
}

export const contactResolver: Resolver<ContactFormValues> = async (values, context, options) =>
  (await loadResolver())(values, context, options);
