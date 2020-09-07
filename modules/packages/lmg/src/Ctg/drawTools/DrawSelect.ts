import Draw from "../../Draw";
import { Suit } from "../Suit";
import ScrollEl from "../../ScrollBar/ScrollEl";



export class DrawSelect extends Draw {
    selectrpstart = 0; // 相对开始位置
    selectend = 0; // 选择结束点
    selectrpend = 0; // 相对结束位置
    selectflag = false;
    suit: Suit
    selectstart = 0; // 选择开始点
    selectstartposition = 0; // 选择开始相对位置与数据长度无关
    selectingBar: ScrollEl;

    startingBar: ScrollEl;
    endingBar: ScrollEl;
    get selectingBarPoint() {
        const { suit } = this
        return ~~(suit.leftViewposition + (this.selectingBar ? this.selectingBar.getLeft() * 2 : 0));
    }

    get $selectrpend() {
        return this.selectrpend;
    }
    set $selectrpend(value: number) {
        this.selectrpend = value;
        const absLen = (value - this.suit.leftViewposition) / 2;
        this.endingBar.setLeft(absLen, false);
        this.showselect();
        this.selectflag && this.suit.drawobj.showcur(value);
        this.suit.emit('endTime', value);
    }
    get $selectrpstart() {
        return this.selectrpstart;
    }
    set $selectrpstart(value: number) {
        this.selectrpstart = value;
        const absLen = (value - this.suit.leftViewposition) / 2;

        this.startingBar.setLeft(absLen, false);
        this.showselect();
        this.selectflag && this.suit.drawobj.showcur(value);
        this.suit.emit('startTime', value);
    }
    constructor(wrap: HTMLElement, canvas: HTMLCanvasElement, suit: Suit,) {
        super(wrap, canvas)
        this.suit = suit
    }
    init() {
        this.createBar();
    }
    //2020-03-05 add clear
    clearselect = () => {
        const { suit, context2D } = this;
        const selectcontext = context2D
        selectcontext.clearRect(0, 0, suit.width, suit.height);
        this.selectrpstart = 0; // 相对开始位置
        this.selectend = 0; // 选择结束点
        this.selectrpend = 0; // 相对结束位置
        this.selectflag = false;
        this.selectstart = 0; // 选择开始点
        this.selectstartposition = 0; // 选择开始相对位置与数据长度无关
    }
    showselect = (start?: number, end?: number) => {
        const { suit, context2D } = this;
        const selectcontext = context2D
        start = start === void 0 ? this.selectrpstart : start
        end = end === void 0 ? this.selectrpend : end
        const basetop = this.suit.drawobj.basetop
        // console.log('printin', suit.rightViewPosition,start, end);
        let drawwidth = suit.width;
        selectcontext.clearRect(0, 0, drawwidth, suit.height);
        if (end == 0) {
            return;
        }
        //横向选择区域设置填充色
        let curstart = suit.rightViewPosition < drawwidth * 2 ? 0 : (suit.rightViewPosition - drawwidth * 2);
        if (suit.data.index <= drawwidth * 2) {
            end = end / 2;
        } else {
            end = (suit.rightViewPosition - end) > 0 ? drawwidth - Math.floor((suit.rightViewPosition - end) / 2) : drawwidth;
        }
        // if(end>drawwidth*2){
        //   end = (suit.rightViewPosition - end) > 0 ? drawwidth - Math.floor((suit.rightViewPosition - end) / 2) : drawwidth;
        // }else{
        //   end = Math.floor(end/2);
        // }
        // if(end >= drawwidth * 2){
        // }else{
        //   end = Math.floor(end/2);
        // }
        start = start - curstart > 0 ? start - curstart : 0;
        start = (start + 4) / 2
        const baseHeight = this.suit.height - 4
        // console.log('printts1',curstart, start/2, end);
        selectcontext.fillStyle = suit.ctgconfig.selectarea;
        // selectcontext.fillRect(start / 2, basetop, end - start / 2, suit.height - basetop);
        selectcontext.beginPath();
        selectcontext.strokeStyle = 'rgb(10, 10, 20)';
        selectcontext.lineWidth = 4;
        selectcontext.moveTo(start, basetop);
        selectcontext.lineTo(start, baseHeight);


        selectcontext.moveTo(start, baseHeight);
        selectcontext.lineTo(end, baseHeight);
        selectcontext.moveTo(end, basetop);
        selectcontext.lineTo(start, basetop);

        if (this.selectend == 0) {
            selectcontext.moveTo(end, basetop);
            selectcontext.lineTo(end, baseHeight);
        }
        // console.log('printts2',curstart, start/2, end);
        selectcontext.stroke();
        this.startingBar.setLeft(start - 2, false)
        this.endingBar.setLeft(end - 2, false)

        const leftEdge = this.suit.leftViewposition - 240
        const rightEdge = this.suit.rightViewPosition + 240

        if (this.selectrpstart <= leftEdge || this.selectrpstart >= rightEdge) {
            this.startingBar.setVisibility(false)
        } else {
            this.startingBar.setVisibility(this.selectflag)
        }
        if (this.selectrpend <= leftEdge || this.selectrpend >= rightEdge) {
            this.endingBar.setVisibility(false)
        } else {
            this.endingBar.setVisibility(this.selectflag)
        }
    };
    selectBasedOnStartingBar(isLeft = true, len = this.suit.ctgconfig.print_interval * 240) {
        const { suit } = this
        const { width, data, } = suit;
        let endPosition;
        if (isLeft) {
            if (this.selectingBarPoint < 1) {
                this.selectingBar.setLeft(this.width);
                suit.rightViewPosition = data.index;
            }
            endPosition = this.selectingBarPoint - len;
            this.$selectrpstart = Math.max(endPosition, 0);
            this.$selectrpend = this.selectingBarPoint;
        } else {
            if (this.selectingBarPoint + 10 >= data.index) {
                suit.rightViewPosition = width * 2;
                this.selectingBar.setLeft(0);
            }

            endPosition = this.selectingBarPoint + len;
            this.$selectrpend = Math.min(endPosition, data.index)
            this.$selectrpstart = this.selectingBarPoint;
        }
        // this.showselect()
        this.suit.updateBarTool()

    }

    updateSelectCur() {
        const { suit } = this
        // if (!this.selectflag) {
        if (suit.rightViewPosition > suit.canvasline.width * 2) {
            this.selectstart =
                this.selectstartposition * 2 + suit.rightViewPosition - 2 * suit.canvasline.width;
        } else {
            this.selectstart = this.selectstartposition * 2;
        }
        // this.suit.emit('startTime', this.selectstart)
        suit.type !== 0 && suit.drawobj.showcur(this.selectstart, false);
        // }
    }

    createBar() {
        if (this.startingBar && this.endingBar && this.selectingBar) {
            if (this.suit.data.keepSelection) return
            this.selectingBar.setLeft(0)
            this.startingBar.setLeft(0);

            return;
        }
        const { barTool } = this.suit;
        const startingBar = (this.startingBar = barTool.createRod('开始'));
        const endingBar = (this.endingBar = barTool.createRod('结束'));
        const selectingBar = (this.selectingBar = barTool.createRod('选择'));
        (this.suit.type === 0 || this.suit.data.selectBarHidden) && selectingBar.setVisibility(false);
        selectingBar.setLeft(0);
        startingBar.setLeft(0);
        //endingBar.setOffset(100)
        endingBar.toggleVisibility();
        startingBar.toggleVisibility();
        selectingBar.on('change:x', value => {
            if (!this.suit) return
            this.suit.drawobj && this.suit.drawobj.showcur(this.selectingBarPoint, false);
            this.suit.emit('change:selectPoint', this.selectingBarPoint)


        });
        startingBar.on('change:x', value => {
            // this.selectrpstart = value * 2;
            // this.selectstartposition = value;
            // // console.log('print_开始', value, this.rightViewPosition, this.canvasline.width);
            // if (value !== 0 && this.type < 1) {
            //   this.dragtimestamp = new Date().getTime();
            // }
            // if (this.rightViewPosition > this.canvasline.width * 2) {
            //   this.selectstart = value * 2 + this.rightViewPosition - 2 * this.canvasline.width;
            // } else {
            //   if (this.type < 1) {
            //     this.selectstart = value * 2 + this.rightViewPosition - 2 * this.canvasline.width;
            //   } else {
            //     this.selectstart = value * 2;
            //   }
            // }
            // this.drawobj.showcur(this.selectstart, false);
            // this.selectrpstart = this.selectstart;
            this.$selectrpstart = suit.leftViewposition + value * 2;
            // this.suit.emit('startTime', this.selectstart)
        });
        const { suit } = this
        endingBar.on('change:x', value => {
            if (suit.data.index < suit.canvasline.width * 2) {
                this.selectrpend = value * 2;
            } else {
                this.selectrpend = suit.rightViewPosition - (suit.canvasline.width - value) * 2;
            }
            if (this.selectrpstart > this.selectrpend) {
                return;
            }
            // console.log('print_结束', value, this.selectrpstart, this.selectrpend)
            this.showselect();
            this.suit.emit('endTime', this.selectrpend);

            this.$selectrpend = suit.leftViewposition + value * 2;
            // this.suit.emit('startTime', this.selectstart)
        });
        // selectingBar.on('change:x', value => {
        //   this.selectingBarPoit = value
        // })
    }

}
