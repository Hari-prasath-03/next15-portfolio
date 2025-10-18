import { SocialsSchema } from "../types/schemas";
import Social from "../lib/models/social.model";
import connectToDb from "../lib/db";

export async function GET() {
  await connectToDb();
  const socials = await Social.find({});
  return Response.json(socials, { status: 200 });
}

export async function POST(request: Request) {
  const socials = await request.json();
  if (Array.isArray(socials)) {
    const parsed = SocialsSchema.array().safeParse(socials);

    if (!parsed.success) return Response.json(parsed.error, { status: 400 });

    await connectToDb();
    await Social.insertMany(parsed.data);
    return Response.json(
      { message: "Social links created successfully." },
      { status: 201 }
    );
  } else {
    const parsed = SocialsSchema.safeParse(socials);
    if (!parsed.success) return Response.json(parsed.error, { status: 400 });

    await connectToDb();
    await Social.create(parsed.data);
    return Response.json(
      { message: "Social link created successfully." },
      { status: 201 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const parsed = SocialsSchema.safeParse(body);

  if (!parsed.success) return Response.json(parsed.error, { status: 400 });

  await connectToDb();
  const isUpdated = await Social.findByIdAndUpdate(parsed.data.id, parsed.data);
  return Response.json(
    {
      message: isUpdated
        ? "Social link updated successfully"
        : "Social link not found",
    },
    { status: isUpdated ? 200 : 404 }
  );
}
