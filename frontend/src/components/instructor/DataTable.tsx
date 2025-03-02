import * as React from "react"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { Pencil, Trash } from "lucide-react"
import { makeRequest } from "@/useful/ApiContext"
import useToast from "@/hooks/useToast"
import { useNavigate } from "react-router-dom"

export default function DataTable({ datax }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const { promisetoast } = useToast()
  const [tabledata, setTableData] = React.useState<any>(datax || [])
  const navigate=useNavigate()
  async function onDelete(id: any) {

    setTableData(tabledata.filter(e => e?._id != id))
    await promisetoast(
      makeRequest({ url: `articles/delete/${id}` }), 'delteed'
    )

  }
  function onEdit(id) {
  
    id && navigate(`/article/${id}`)
}
  React.useEffect(() => {
    setTableData(datax?.articles || [])
  }, [datax])

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
      },
      {
        accessorKey: "createdAt",
        header: "Created Time",
        cell: ({ row }) => <div>{format(new Date(row.getValue("createdAt")), "yyyy-MM-dd HH:mm")}</div>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button size="icon" variant="ghost" onClick={() => onEdit(row.original?._id)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onDelete(row.original._id)}>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  )

  const table = useReactTable({
    data: tabledata,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
