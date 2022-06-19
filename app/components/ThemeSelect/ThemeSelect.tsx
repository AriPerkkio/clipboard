import { ActionFunction, json, LoaderFunction } from "@remix-run/cloudflare";
import { Form, useSubmit } from "@remix-run/react";
import { useRef } from "react";

import { unencryptedSession } from "~/models/sessions.server";

const themes = [
  "aqua",
  "black",
  "bumblebee",
  "cmyk",
  "corporate",
  "cupcake",
  "cyberpunk",
  "dark",
  "dracula",
  "emerald",
  "fantasy",
  "forest",
  "garden",
  "halloween",
  "light",
  "lofi",
  "luxury",
  "pastel",
  "retro",
  "synthwave",
  "valentine",
  "wireframe",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const;

export const loader: LoaderFunction = async ({ request }) => {
  const session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );
  const theme = session.get("theme") || "dark";

  return json({ theme });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await unencryptedSession.getSession(
    request.headers.get("Cookie")
  );

  const formData = new URLSearchParams(await request.text());
  const theme = formData.get("theme") || "dark";
  session.set("theme", theme);

  return json(null, {
    headers: {
      "Set-Cookie": await unencryptedSession.commitSession(session),
    },
  });
};

export default function ThemeSelect({
  value,
}: {
  value?: typeof themes[number];
}) {
  const submit = useSubmit();
  const ref = useRef<HTMLFormElement>(null);

  function onChange() {
    submit(ref.current);
  }

  return (
    <Form ref={ref} method="post">
      <select
        value={value}
        name="theme"
        onChange={onChange}
        className="select absolute right-4 top-4"
      >
        {themes.map((theme) => (
          <option key={theme}>{theme}</option>
        ))}
      </select>
    </Form>
  );
}
