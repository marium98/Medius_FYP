import Case from '../model/Case';
import Information from '../model/CaseInformation';


export const CASE = [
  new Case('C-001', 'Copyright', '12-2-2020'),
  new Case('P-002', 'Patents', '8-9-2020'),
  new Case('D-034', 'Design', '6-4-2019'),
  new Case('T-090', 'Trademarks', '20-3-2018'),
];

export const INFORMATION = [
  new Information(
    'I1',
    'C-001',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0fqPx-X2dTb--7dCcyEcq9gbP1XhzvwH6LbWSFsQgBIWIgECNIkQBtZOfO_CBEy6o5g&usqp=CAU',
    'Copyright',
    'please register it',
    'Software',
    'field',
    4,
    '03341232022',
    'Karachi',
    'document.pdf',
    1
  ),
  new Information(
    'I2',
    'P-002',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0fqPx-X2dTb--7dCcyEcq9gbP1XhzvwH6LbWSFsQgBIWIgECNIkQBtZOfO_CBEy6o5g&usqp=CAU',
    'Patents',
    'please register it',
    'Computer',
    'field',
    4,
    '03341232022',
    'Lahore',
    'document.pdf',
    2
  ),
  new Information(
    'I3',
    'D-034',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0fqPx-X2dTb--7dCcyEcq9gbP1XhzvwH6LbWSFsQgBIWIgECNIkQBtZOfO_CBEy6o5g&usqp=CAU',
    'Design',
    'please register it',
    'Computer',
    'field',
    4,
    '03341232022',
    'Lahore',
    'document.pdf',
    4
  ),
  new Information(
    'I4',
    'T-090',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0fqPx-X2dTb--7dCcyEcq9gbP1XhzvwH6LbWSFsQgBIWIgECNIkQBtZOfO_CBEy6o5g&usqp=CAU',
    'Trademarks',
    'please register it',
    'Computer',
    'field',
    4,
    '03341232022',
    'Lahore',
    'document.pdf',
    5
  )

];
