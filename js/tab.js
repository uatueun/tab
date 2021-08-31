var that;

class Tab {

    constructor(id) {

        //獲取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
            //section父元素
        this.f_section = this.main.querySelector('.tabscon')
        this.init();
    }
    init() {
        this.updateNode();
        // init 初始化操作讓相關的元素綁定事件
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
        }
    }

    //獲取所有的li 和 section
    //以為我們動態添加元素 需要從新獲取對應的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
    }

    //1.切換功能
    toggleTab() {
            // console.log(this.index);
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';



        }
        //清除所有li 和 section的類
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //2.添加功能
    addTab() {
        that.clearClass();
        //(1) 創建li元素和section元素
        var random = Math.random();
        var li = '<li class="liactive"><span>新標籤</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">測試 ' + random + '</section>';

        //(2) 把這兩個元素追加到對應的父元素裡面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.f_section.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    //3.刪除功能
    removeTab(e) {
        e.stopPropagation(); //阻止冒泡 防止出發li 的切換點擊事件
        var index = this.parentNode.index;
        console.log(index);
        // 根據索引號刪除對應的li和section remove()方法可以直接刪除指定的元素
        that.lis[index].remove();
        that.section[index].remove();
        that.init();
        // 當我們刪除的不是選狀態的li 的時候,原來的選中狀態li保持不變
        if (document.querySelector('.liactive')) return;
        //當我們刪除了選中狀態的這個li的時候,讓他的前一個li 處於選定狀態
        index--;
        //手動調用我們的點擊事件 不需要滑鼠觸發
        that.lis[index] && that.lis[index].click();
    }

    //4.修改功能
    editTab() {
        // 雙擊禁止選定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // alert(11)
        this.innerHTML = '<input type = "text" />';
    }

}
new Tab('#tab');