document.addEventListener('DOMContentLoaded', function() {
    // UUID 생성 함수
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 현재 날짜를 YYYY-MM-DD 형식으로 반환하는 함수
    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 로컬 스토리지에서 데이터 불러오기
    const storedData = JSON.parse(localStorage.getItem('gridData')) || [
        { id: generateUUID(), title: '첫 번째 게시물', content: '첫 번째 게시물 내용', author: '작성자1', date: getCurrentDate() },
        { id: generateUUID(), title: '두 번째 게시물', content: '두 번째 게시물 내용', author: '작성자2', date: getCurrentDate() },
    ];

    const grid = new tui.Grid({
        el: document.getElementById('grid'),
        data: storedData,
        columns: [
            { header: 'ID', name: 'id', width: 100, sortable: true, resizable: true },
            { header: '제목', name: 'title', editor: 'text', sortable: true, resizable: true, formatter: function(item) {
                return item.row.isNew ? `${item.value} <span class="new-icon">New</span>` : item.value;
            }},
            { header: '내용', name: 'content', editor: 'text', sortable: true, resizable: true },
            { header: '작성자', name: 'author', editor: 'text', sortable: true, resizable: true },
            { header: '날짜', name: 'date', editor: 'text', sortable: true, resizable: true },
            { header: '선택', name: 'checkbox', width: 50, align: 'center', formatter: 'checkbox', sortable: false, resizable: true }
        ],
        rowHeaders: ['checkbox'],
        columnOptions: {
            resizable: true
        }
    });

    // 데이터 총 건수 업데이트 함수
    function updateDataCount() {
        const dataCount = grid.getData().length;
        document.getElementById('dataCount').textContent = `총 건수: ${dataCount}`;
    }

    // 데이터 저장 함수
    function saveData() {
        const data = grid.getData();
        localStorage.setItem('gridData', JSON.stringify(data));
        updateDataCount();
    }

    // 초기 데이터 총 건수 업데이트
    updateDataCount();

    // 행 추가 기능
    document.getElementById('addRow').addEventListener('click', function() {
        console.log('추가 버튼 클릭됨');
        const addRowModal = new bootstrap.Modal(document.getElementById('addRowModal'));
        addRowModal.show();
    });

    // 모달 폼 제출 시 새로운 행 추가
    document.getElementById('addRowForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('새 항목 추가 폼 제출됨');
        const title = document.getElementById('titleInput').value;
        const content = document.getElementById('contentInput').value;
        const author = document.getElementById('authorInput').value;
        const newRow = { id: generateUUID(), title: title, content: content, author: author, date: getCurrentDate(), isNew: true };
        grid.appendRow(newRow);  // 새 행을 추가
        saveData();
		const addRowModal = bootstrap.Modal.getInstance(document.getElementById('addRowModal'));
        addRowModal.hide();
        document.getElementById('addRowForm').reset();
    });

    // 삭제할 행을 저장할 변수
    let rowsToDelete = [];

    // 삭제 버튼 클릭 시 모달 팝업 표시
    document.getElementById('removeRow').addEventListener('click', function() {
        console.log('삭제 버튼 클릭됨');
        rowsToDelete = grid.getCheckedRows();
        if (rowsToDelete.length > 0) {
            const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            confirmDeleteModal.show();
        } else {
            alert('삭제할 항목을 선택하세요.');
        }
    });

    // 모달 팝업에서 삭제 확인 버튼 클릭 시 행 삭제
    document.getElementById('confirmDeleteButton').addEventListener('click', function() {
        console.log('삭제 확인 버튼 클릭됨');
        rowsToDelete.forEach(row => {
            grid.removeRow(row.rowKey);
        });
        saveData();
        rowsToDelete = [];
        const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
        confirmDeleteModal.hide();
    });

    // 데이터 변경 시 로컬 스토리지에 저장
    grid.on('afterChange', function() {
        console.log('데이터 변경됨');
        saveData();
	grid.refreshLayout();
    });

    // 검색 기능
    document.getElementById('searchButton').addEventListener('click', function() {
        console.log('검색 버튼 클릭됨');
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        if (searchValue) {
            const filteredData = storedData.filter(item => 
                item.title.toLowerCase().includes(searchValue) ||
                item.content.toLowerCase().includes(searchValue) ||
                item.author.toLowerCase().includes(searchValue) ||
                item.date.toLowerCase().includes(searchValue)
            );
            grid.resetData(filteredData);
        } else {
            location.reload();  // 검색어가 없으면 페이지를 새로고침
        }
        updateDataCount();
    });

    // 다크 모드 토글 기능
    document.getElementById('toggleDarkMode').addEventListener('change', function() {
        console.log('다크 모드 토글됨');
        document.body.classList.toggle('dark-mode');
    });
});
