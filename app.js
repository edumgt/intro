document.addEventListener('DOMContentLoaded', function () {

    new Pikaday({
        field: document.getElementById('datePicker'),
        format: 'YYYY-MM-DD',
        toString(date, format) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        }
    });

    document.getElementById('gearIcon').addEventListener('click', () => {
        const floatingNav = document.getElementById('floatingNav');
        floatingNav.classList.remove('hidden'); // Show the floating menu
    });

    document.getElementById('closeFloatingNav').addEventListener('click', () => {
        const floatingNav = document.getElementById('floatingNav');
        floatingNav.classList.add('hidden'); // Hide the floating menu
    });


    document.getElementById('hamburgerButton').addEventListener('click', () => {
        const offCanvas = document.getElementById('offCanvas');
        offCanvas.classList.remove('hidden', '-translate-x-full'); // Show the off-canvas menu
    });

    document.getElementById('closeOffCanvas').addEventListener('click', () => {
        const offCanvas = document.getElementById('offCanvas');
        offCanvas.classList.add('-translate-x-full'); // Hide the off-canvas menu
    });


    // UUID Generator Function
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const currentDate = new Date().toLocaleDateString('ko-KR', options).replace(/[\.]/g, '-').replace(/[\s]/g, '').substring(0, 10);

    let rowsPerPage = 20; // Default rows per page

    // Function to update pagination
    function updatePagination(totalItems, perPage) {
        pagination.reset(totalItems); // Reset pagination with the updated total items
        pagination.setItemsPerPage(perPage); // Set items per page
    }

    // Function to load paginated data
    function loadPageData(page, perPage) {
        const allData = loadData();
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return allData.slice(start, end);
    }

    // Function to update the total count display
    function updateDataCount() {
        const allData = loadData();
        const dataCountElement = document.getElementById('dataCount');
        dataCountElement.textContent = `Total Rows: ${allData.length}`;
    }

    // Function to load data from localStorage
    function loadData() {
        const data = localStorage.getItem('gridData');
        return data ? JSON.parse(data) : [];
    }

    // Function to save data to localStorage
    function saveData(data) {
        const filteredData = data.filter(row => row.tpCd && row.tpNm);
        localStorage.setItem('gridData', JSON.stringify(filteredData));
    }

    class BadgeRenderer {
        constructor(props) {
            const el = document.createElement('span');
            el.className = 'px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600';
            el.textContent = 'View';
            el.style.display = 'inline-block';
            el.style.textAlign = 'center';
            this.el = el;
            this.props = props;
        }

        getElement() {
            return this.el;
        }

        render(props) {
            this.props = props;
            // You can add any additional data binding logic here if needed
        }
    }


    // Initialize the grid
    const grid = new tui.Grid({
        el: document.getElementById('grid'),
        rowHeaders: ['rowNum', 'checkbox'],
        editingEvent: 'click',
        scrollX: true,
        scrollY: true,
        bodyHeight: 630,
        pageOptions: {
            useClient: true,
            perPage: rowsPerPage
        },
        rowHeight: 45,
        minRowHeight: 45,
        columns: [
            { header: 'Key', name: 'Key', width: 250, align: 'left', sortable: true, resizable: true, width: 100, minWidth: 80 }, // UUID column    
            { header: '그룹코드', name: 'tpCd', editor: 'text', validation: { required: true }, sortable: true, filter: 'text', resizable: true, width: 150 },
            { header: '코드명', name: 'tpNm', editor: 'text', sortable: true, filter: 'text', resizable: true, width: 200 },
            { header: '설명', name: 'descCntn', editor: 'text', sortable: true, filter: 'text', resizable: true, },
            {
                header: '사용여부', name: 'useYn', width: 100, align: 'center',
                editor: {
                    type: 'select',
                    options: { listItems: [{ text: 'Y', value: 'Y' }, { text: 'N', value: 'N' }] }
                },
                sortable: true,
                filter: {
                    type: 'select',
                    options: [
                        { text: 'All', value: '' },
                        { text: 'Y', value: 'Y' },
                        { text: 'N', value: 'N' }
                    ]
                }
            },
            { header: '생성일시', name: 'createdAt', width: 150, align: 'center', sortable: true },
            {
                header: 'View',
                name: 'view',
                align: 'center',
                text: 'V',
                renderer: {
                    type: BadgeRenderer // Use the custom renderer for the badge
                },
                width: 60,
                resizable: false
            }
        ],
        data: loadPageData(1, rowsPerPage), // Load initial page data
        columnOptions: {
            frozenCount: 2, // Freeze 3 left most columns and 
            frozenBorderWidth: 2 // set the border width of frozen columns to be 2px.
        }
    });



    tui.Grid.applyTheme('striped', {
        cell: {
            normal: {
                border: '#000' // Set row border color
            },
            evenRow: {
                background: '#f9f9f9' // Optional: Add background for even rows
            },
            hover: {
                border: '#007aff', // Optional: Border color on hover
                background: '#f0f8ff' // Optional: Background color on hover
            },
            head: {
                background: '#004080', // Set header background color (dark blue)
                border: '#cccccc', // Set header border color
                text: '#ffffff' // Set header text color (white)
            }
        },
        rowHeader: {
            background: '#002855', // Dark blue background
            border: '#cccccc', // Optional: Row header border color
            text: '#ffffff' // Optional: White text color
        }
    });


    // Initial update of data count
    updateDataCount();

    // Delete row functionality
    document.getElementById('delrow').addEventListener('click', function () {
        const chkArray = grid.getCheckedRowKeys();
        if (chkArray.length > 0) {
            grid.removeCheckedRows();
            saveData(grid.getData());
            showToast('선택된 항목이 삭제되었습니다.', 'success');
            updateDataCount();
            //updatePagination(loadData().length, rowsPerPage);
        } else {
            showToast('삭제할 항목이 선택되지 않았습니다.', 'warning');
        }
    });

    // Save row functionality
    document.getElementById('saverow').addEventListener('click', function () {

        const data = grid.getData();
        // Filter out rows without a Key value
        const validData = data.filter(row => row.Key && row.Key.trim() !== '');

        // Save only rows with valid Key values
        saveData(validData);
        updateDataCount();

        console.log(" validData : " + JSON.stringify(validData));

        // Send the data to the backend API
        fetch('https://your-backend-api.com/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                showToast('데이터가 성공적으로 저장되었습니다.');
            })
            .catch((error) => {
                console.error('Error:', error);
                showToast('로컬 스토리지에 저장 하였으나, 원격 서버 데이터 저장에 실패했습니다.');

            });
        });

        // Add new row functionality
        document.getElementById('newrow').addEventListener('click', function () {
            const data = grid.getData();
            const hasEmptyRow = data.some(row => row.tpCd === '' || row.tpNm === '');
            if (hasEmptyRow) {
                showToast('1번행에 입력가능 합니다.', 'info');
                return;
            }

            const newRow = { Key: generateUUID(), tpCd: '', tpNm: '', descCntn: '', useYn: 'Y', createdAt: currentDate };
            grid.prependRow(newRow, { focus: true });

            saveData([...data, newRow]);
            updateDataCount();
        });

        // Handle View Button Click in Grid
        grid.on('click', (ev) => {
            const { columnName, rowKey } = ev;

            console.log("rowKey : " + rowKey);

            if (columnName === 'view') {
                const row = grid.getRow(rowKey); // Get the row data
                toggleModal(true, row, rowKey); // Pass the row data and row key to the modal
            }

            if (ev.columnName === 'Key') {
                showToast('자동 부여 Key 로 편집 불가 합니다.', 'info');
            }
        });


        // Initialize a new row
        function initNew() {
            const rowData = { Key: generateUUID(), tpCd: '', tpNm: '', descCntn: '', useYn: 'Y', createdAt: currentDate };
            grid.prependRow(rowData, { focus: true });
            
            updateDataCount();
        }

        initNew();

        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => {
            toggleModal(false);
        });


        let currentRowKey = null; // To track the current row being edited

        function toggleModal(show, rowData = {}, rowKey = null) {
            const modal = document.getElementById('modal');
            const modalForm = document.getElementById('modalForm');
            currentRowKey = rowKey; // Store the row key

            if (show) {
                // Clear the form
                modalForm.innerHTML = '';

                // Populate the form with row data
                for (const [key, value] of Object.entries(rowData)) {
                    const formGroup = document.createElement('div');
                    formGroup.className = 'flex flex-col';

                    const label = document.createElement('label');
                    label.className = 'text-sm font-medium text-gray-700';
                    label.textContent = key;

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'border rounded px-3 py-2 mt-1 text-gray-900';
                    input.name = key;
                    input.value = value;

                    formGroup.appendChild(label);
                    formGroup.appendChild(input);
                    modalForm.appendChild(formGroup);
                }

                modal.classList.remove('hidden'); // Show modal
            } else {
                modal.classList.add('hidden'); // Hide modal
            }
        }

        document.getElementById('saveModal').addEventListener('click', () => {
            const modalForm = document.getElementById('modalForm');
            const formData = new FormData(modalForm);
            const updatedData = {};

            // Collect updated values from the form
            for (const [key, value] of formData.entries()) {
                updatedData[key] = value;
            }

            if (currentRowKey !== null) {
                // Update the grid's data
                //grid.setValue(currentRowKey, 'Key', updatedData.Key);
                grid.setValue(currentRowKey, 'tpCd', updatedData.tpCd);
                grid.setValue(currentRowKey, 'tpNm', updatedData.tpNm);
                grid.setValue(currentRowKey, 'descCntn', updatedData.descCntn);
                grid.setValue(currentRowKey, 'useYn', updatedData.useYn);
            }

            // Hide the modal and show a success toast
            toggleModal(false);
            saveData(grid.getData());
            showToast('해당 건의 데이타를 저장하였습니다.', 'success');
        });

        // Add event listener for the top-right close button
        document.getElementById('closeModalTopRight').addEventListener('click', () => {
            toggleModal(false);
        });

        // Add event listener for the bottom close button
        document.getElementById('closeModal').addEventListener('click', () => {
            toggleModal(false);
        });

        // Toast Functionality
        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = `toast toast-${type} show`;
            toast.innerText = message;

            toastContainer.appendChild(toast);

            // Automatically remove the toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        document.getElementById('searchByDate').addEventListener('click', function () {

            const gridData = loadData();

            const selectedDate = document.getElementById('datePicker').value;
            const groupCode = document.getElementById('groupCode').value.toLowerCase();
            const codeName = document.getElementById('codeName').value.toLowerCase();
            const description = document.getElementById('description').value.toLowerCase();



            const filteredData = gridData.filter(row => {
                const matchesDate = selectedDate ? row.createdAt === selectedDate : true;
                const matchesGroupCode = groupCode ? row.tpCd.toLowerCase().includes(groupCode) : true;
                const matchesCodeName = codeName ? row.tpNm.toLowerCase().includes(codeName) : true;
                const matchesDescription = description ? row.descCntn.toLowerCase().includes(description) : true;
                return matchesDate && matchesGroupCode && matchesCodeName && matchesDescription;
            });

            grid.resetData(filteredData);

            // Disable the Save button
            document.getElementById('saverow').disabled = true;
            document.getElementById('saverow').classList.add('bg-gray-400', 'cursor-not-allowed');
            document.getElementById('saverow').classList.remove('bg-gray-800', 'hover:bg-gray-700');

            document.getElementById('newrow').disabled = true;
            document.getElementById('newrow').classList.add('bg-gray-400', 'cursor-not-allowed');
            document.getElementById('newrow').classList.remove('bg-gray-800', 'hover:bg-gray-700');

            showToast('검색 클릭 시 신규, 저장 기능은 비활성화 됩니다.');

        });

        document.getElementById('resetSearch').addEventListener('click', function () {

            const gridData = loadData();

            // Reset search fields
            document.getElementById('groupCode').value = '';
            document.getElementById('codeName').value = '';
            document.getElementById('description').value = '';
            document.getElementById('datePicker').value = '';

            // Reset grid data
            grid.resetData(gridData);

            // Enable the Save button
            const saveButton = document.getElementById('saverow');
            saveButton.disabled = false;
            saveButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            saveButton.classList.add('bg-gray-800', 'hover:bg-gray-700');


            const newButton = document.getElementById('newrow');
            newButton.disabled = false;
            newButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            newButton.classList.add('bg-gray-800', 'hover:bg-gray-700');

            showToast('신규, 저장 기능이 활성화 됩니다.');
        });

    });

