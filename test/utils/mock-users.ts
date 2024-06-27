import { Document } from 'src/common/domain/entities/document';
import { Address } from 'src/users/domain/entities/address';
import { User } from 'src/users/domain/entities/user';

export const users = [
  new User(
    'João Silva',
    new Document('123456789'),
    'senha123',
    'joao.silva@exemplo.com',
    '1234567890',
    new Date('1990-01-01'),
    [
      new Address(
        'São Paulo',
        'São Paulo',
        'Avenida Paulista',
        '123',
        '01311-200',
        'Apartamento 1',
        'Cerqueira César',
        true,
      ),
    ],
    'Sobre João Silva',
    'joao.png',
  ),
  new User(
    'Maria Souza',
    new Document('987654321'),
    'senha456',
    'maria.souza@exemplo.com',
    '0987654321',
    new Date('1992-02-02'),
    [
      new Address(
        'Rio de Janeiro',
        'Rio de Janeiro',
        'Avenida Atlântica',
        '456',
        '22010-000',
        'Suite 2',
        'Copacabana',
        true,
      ),
    ],
    'Sobre Maria Souza',
    'maria.png',
  ),
];
