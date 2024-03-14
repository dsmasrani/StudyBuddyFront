import { createClient } from '@supabase/supabase-js'
import { serverPath } from './root'
import dotenv from 'dotenv';
const supabaseUrl: string = '...';
const supabaseKey: string = '...';
const ACCESS_TOKEN = '...';

const supabase = createClient(supabaseUrl, supabaseKey);

export class API {
    static getClient() {
        return supabase;
    }

    static async getDynamicKey() {
        const response = await supabase.auth.getSession()
        return response.data.session?.user.email;
    }
    static async getDynamicName() {
        const response = await supabase.auth.getSession()
        return response.data.session?.user.user_metadata.full_name;
    }
    static async getUserID() {
        const response = await supabase.auth.getSession()
        return response.data.session?.user.id;
        // .then(response => {
        //     return response.data.session?.user.id;
        // });
    }
    static async chat(message: string, responseHandler: (response: any) => void) {
        let url = 'https://studybuddy-mqbs.onrender.com/query/query?question=' + encodeURIComponent(message) + '&user_UUID=' + (await API.getUserID());
        const response = await fetch(url, {
            method: "GET",
            headers: { 
                "Access-Control-Allow-Origin": "*",
                "Accept": "*/*",
                "access_token": ACCESS_TOKEN
            }
          })
        responseHandler(await response.json());
    }
}