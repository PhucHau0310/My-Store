const Categories = () => {
    return (
        <div className="py-5 pb-10 ">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="text-[#010101] font-semibold text-2xl mb-2">
                        Categories
                    </h1>
                    <p className="text-[#80888b] font-normal text-base">
                        Lets check your category details
                    </p>
                </div>
                <button
                    // onClick={() => setOpenAddProduct(true)}
                    className="bg-white rounded-xl shadow-lg hover:drop-shadow-md transform transition-all duration-300 p-4 text-black font-semibold text-base"
                >
                    Add Category
                </button>

                {/* {openAddProduct && (
                    <AddProduct
                        openAddProduct={openAddProduct}
                        setOpenAddProduct={setOpenAddProduct}
                    />
                )} */}
            </div>

            <div
                style={{ height: 450, width: '100%' }}
                className="rounded-2xl mt-7"
            >
                {/* <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    checkboxSelection
                    // onRowModesModelChange={handleRowModesModelChange}
                    // onRowEditStop={handleRowEditStop}
                    // processRowUpdate={processRowUpdate}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                /> */}
            </div>
        </div>
    );
};

export default Categories;
