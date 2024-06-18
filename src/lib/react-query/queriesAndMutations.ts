import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/api';
import { INewPost, INewUser } from '@/types';
import { CreatePost } from '@/_root/pages';
import { QUERY_KEYS } from './queryKeys';

//for creating the user

export const useCreateUserAccount = () => {
    return useMutation ({
        mutationFn: (user: INewUser) => 
            createUserAccount(user)
        
    })
}

//for signing in the user
export const useSignInAccount = () => {
    return useMutation ({
        mutationFn: (user: {email: string; password: string;}) => signInAccount(user)
        
    });
}
export const useSignOutAccount = () => {
    return useMutation ({
        mutationFn: signOutAccount
        
    });
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => CreatePost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            })
        },
    })
}
  