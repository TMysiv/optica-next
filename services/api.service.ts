import axios from 'axios';
import { Offer } from '@/lib/types';
import { config } from '@/lib/config';

export const createOffer = (offer: Offer) => axios.post(`${config.api}/add`, offer);
