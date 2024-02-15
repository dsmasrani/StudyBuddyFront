// src/models/supabase/profile.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { Profile } from '../profile';
import { connect } from '../../supabaseConnect';

// Initialize Supabase client
const supabase = connect();

// Define the profile table name
const tableName = 'user_keys';

// Function to create a profile
async function updateProfile(profile: Profile, userid: string, id: number): Promise<Profile | null> {
    console.log("PROFILE")
    console.log(profile)
    console.log(id)

    var output = {pinecone_env: profile.pinecone_env,
        pinecone_key: profile.pinecone_key,
       openai_key: profile.openai_key,
       index_name: profile.index_name,
       user_email: userid}
    
    console.log(output)
    const { data, error } = await supabase
        .from(tableName)
        .update(output)
        .eq('id', id)
        .select();
    if (error) {
        console.error('Error creating profile:', error.message);
        return null;
    }

    if (data && (data as any[]).length > 0) {
        return data[0];
    }

    return null;
}

// Function to retrieve a profile by user ID
async function getProfileByUserId(user_id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('user_id', user_id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }

  return data ?? null;
}

export { updateProfile, getProfileByUserId };
