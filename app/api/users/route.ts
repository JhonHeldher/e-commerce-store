import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { currentUser } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();

    let foundUser = await User.findOne({ clerkId: user.id });

    if (!foundUser) {
      foundUser = await User.create({ clerkId: user.id });
      await foundUser.save();
    }

    return NextResponse.json(foundUser, { status: 200 });
  } catch (err) {
    console.log("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
