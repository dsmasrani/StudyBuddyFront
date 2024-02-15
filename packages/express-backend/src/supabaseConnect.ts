// src/supabaseConnect.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

interface SupabaseConnectionOptions {
  apiKey: string;
  projectUrl: string;
}

 export function getSupabaseClient(options: SupabaseConnectionOptions) {
  const { apiKey, projectUrl } = options;
  if (!apiKey || !projectUrl) {
    throw new Error('Supabase API key and project URL must be provided.');
  }
  console.log('Connecting to Supabase at', projectUrl);
  return createClient(projectUrl, apiKey);
}

export function connect() {
  const supabase = getSupabaseClient({
    apiKey: process.env.PROJECT_KEY || '',
    projectUrl: process.env.PROJECT_URL || '',
  });

  // You can return the client here if you want to use it right after establishing the connection
  return supabase;
}
