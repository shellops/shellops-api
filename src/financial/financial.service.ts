import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class FinancialService {
  constructor(private readonly databaseService: DatabaseService) { }

  async checkUserLimit(userId: string): Promise<{ hostCount: number }> {

    const subPath = `${userId}/subscription`;
    const sub = await this.databaseService.get<{ status: string }>(subPath);

    if (sub?.status === 'active')
      return { hostCount: 10 };
    else
      return { hostCount: 1 };

  }

  async processSubscription(sub: {
    id: string,
    quantity: number,
    status: 'active' | 'canceled' | 'past_due',
    metadata: { userId: string }
  }) {
    const path = `${sub.metadata.userId}/subscription`
    await this.databaseService.update(path, sub);
  }
}
