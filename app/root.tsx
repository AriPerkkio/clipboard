import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css";
import ThemeSelect, {
  ThemeAction,
  ThemeLoader,
} from "./components/ThemeSelect";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix deployed on Clouflare Pages utilizing Cloudflare KV",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async (args) => {
  return ThemeLoader(args);
};

export const action: ActionFunction = async (args) => {
  return ThemeAction(args);
};

export default function App() {
  const { theme } = useLoaderData();

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <Meta />
        <Links />
      </head>

      <body>
        <ThemeSelect value={theme} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
