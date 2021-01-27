import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../firebase/database/database.service';

@Injectable()
export class FinancialService {

    constructor(private readonly databaseService: DatabaseService) {

    }

    async checkUserLimit(userId: string): Promise<{ hostCount: number }> {
        
    }

    async processSubscription(stripeSubscription: { id: string, quantity: number, status: 'active' | 'canceled' | 'past_due' }) {

    }



}
