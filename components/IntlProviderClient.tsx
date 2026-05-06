"use client";

import { IntlProvider } from "use-intl";
import type { ReactNode } from "react";
import type { AbstractIntlMessages } from "use-intl";

export function IntlProviderClient({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
}) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
