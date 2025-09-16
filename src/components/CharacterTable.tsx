import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable, 
} from '@tanstack/react-table';
import { Character } from '@/types/api';

const columnHelper = createColumnHelper<Character>();

const columns = [
  columnHelper.accessor('image', {
    header: 'Image',
    cell: (info) => (
      <img
        src={info.getValue()}
        alt={info.row.original.name}
        className="w-12 h-12 rounded-full object-cover"
      />
    ),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <span className="font-medium text-white">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      const color = status === 'Alive' ? 'text-green-400' : 
                   status === 'Dead' ? 'text-red-400' : 'text-gray-400';
      return <span className={color}>{status}</span>;
    },
  }),
  columnHelper.accessor('species', {
    header: 'Species',
    cell: (info) => (
      <span className="text-gray-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: (info) => (
      <span className="text-gray-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('origin.name', {
    header: 'Origin',
    cell: (info) => (
      <span className="text-gray-300">{info.getValue()}</span>
    ),
  }),
];

interface CharacterTableProps {
  characters: Character[];
  onCharacterClick: (id: number) => void;
}

export const CharacterTable = ({ characters, onCharacterClick }: CharacterTableProps) => {
  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-white/10">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onCharacterClick(row.original.id)}
                className="hover:bg-white/5 cursor-pointer transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};