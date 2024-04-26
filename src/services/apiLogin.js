import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error("User could not be Authenticated");
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("User could not be Authenticated");
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ fullName, password, avatar }) {
  let update;
  if (fullName) update = { data: { fullName } };
  if (password) update = { password };

  const { data, error } = await supabase.auth.updateUser(update);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }
  const avatarURL = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: { avatar: avatarURL },
  });

  if (error2) {
    throw new Error(storageError.message);
  }

  return updatedUser;
}
