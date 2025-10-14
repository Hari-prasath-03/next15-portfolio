import z from "zod";
import { SocialsSchema } from "../types/schemas";
import { MultiRecordDb } from "../lib/jsondb";

type SocialLinksType = z.infer<typeof SocialsSchema>;

const db = new MultiRecordDb<SocialLinksType>("socials");

export async function GET() {
  const socials = await db.readAll();
  return Response.json(socials, { status: 200 });
}

export async function POST(request: Request) {
  const socials = await request.json();
  const parsed = z.array(SocialsSchema).safeParse(socials);

  if (!parsed.success) return Response.json(parsed.error, { status: 400 });

  await db.addMany(parsed.data);
  return Response.json({ message: "Social links added successfully" }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const parsed = SocialsSchema.safeParse(body);

  if (!parsed.success) return Response.json(parsed.error, { status: 400 });

  const isUpdated = await db.updateOne(parsed.data.id as number, parsed.data);
  return Response.json({ message: isUpdated ? "Social link updated successfully" : "Social link not found" },
    { status: isUpdated ? 200 : 404 }
  );
}
