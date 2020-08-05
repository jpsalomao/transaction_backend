import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  value: number;
  title: string;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: CreateTransactionDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid transaction type');
    }
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error('Insufficient balance');
    }

    const transaction = this.transactionsRepository.create({
      value,
      type,
      title,
    });

    return transaction;
  }
}

export default CreateTransactionService;
