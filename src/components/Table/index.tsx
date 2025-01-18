// components/Table.tsx
import React from 'react';

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      {children}
    </table>
  );
};

export const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <thead className="bg-gray-800 text-white">
      {children}
    </thead>
  );
};

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <tbody className="text-gray-700">
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <tr className="border-b">
      {children}
    </tr>
  );
};

export const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <td className="py-4 px-6 text-center">
      {children}
    </td>
  );
};
