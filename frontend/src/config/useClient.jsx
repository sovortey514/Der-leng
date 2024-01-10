import axios from 'axios';
import { useState, useEffect } from 'react';

function useClient(accessToken='') {
    
    if(accessToken) {
        return axios.create({
            baseURL: 'http://127.0.0.1:8000',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
    }

    return axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            'Content-Type': 'application/json',
        }
    })

}


export default useClient