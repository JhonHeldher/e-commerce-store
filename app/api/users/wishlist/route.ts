import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import User from "@/lib/models/User";

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    await connectToDB();

    const foundUser = await User.findOne({ clerkId: user.id });

    if (!foundUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return new NextResponse("Product Id required", { status: 400 });
    }

    const isLiked = foundUser.wishlist.includes(productId);

    foundUser.wishlist = isLiked
      ? foundUser.wishlist.filter((id: string) => id !== productId)
      : [...foundUser.wishlist, productId];

    await foundUser.save();

    return NextResponse.json(foundUser, { status: 200 });
  } catch (err) {
    console.error("[wishlist_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
