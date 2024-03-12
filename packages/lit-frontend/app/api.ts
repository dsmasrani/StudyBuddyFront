import { createClient } from '@supabase/supabase-js'
import { serverPath } from './root'

const supabaseUrl = 'https://jazhnnpcpkklxhxdlprw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphemhubnBjcGtrbHhoeGRscHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwOTUwMjcsImV4cCI6MjAxMjY3MTAyN30.0yYa_VFJoouSTex7uot0jL4xWuBLV6c99WBFk2J7zN4'
const supabase = createClient(supabaseUrl, supabaseKey)

const ACCESS_TOKEN = 'studybuddy380y2hriwnf';

export class API {

    static async getUserID() {
        return '68b989ec-7eec-49c0-8f8d-52b01357c0fd';
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
                "access_token": "studybuddy380y2hriwnf"
            }
          })
        responseHandler(await response.json());
    }
}