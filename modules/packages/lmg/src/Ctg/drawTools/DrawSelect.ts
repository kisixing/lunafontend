import Draw from "../../Draw";



export class DrawSelect extends Draw {
    constructor(canvas: HTMLCanvasElement, width = 0, height = 0) {
        super(width, height, canvas)
    }
    init() {
    }
    // showselect = (start?: number, end?: number) => {
    //     const { suit, selectcontext } = this;
    //     start = start === void 0 ? suit.selectrpstart : start
    //     end = end === void 0 ? suit.selectrpend : end

    //     // console.log('printin', suit.rightViewPosition,start, end);
    //     let drawwidth = suit.width;
    //     selectcontext.clearRect(0, 0, drawwidth, suit.height);
    //     if (end == 0) {
    //         return;
    //     }
    //     //横向选择区域设置填充色
    //     let curstart = suit.rightViewPosition < drawwidth * 2 ? 0 : (suit.rightViewPosition - drawwidth * 2);
    //     if (suit.data.index <= drawwidth * 2) {
    //         end = end / 2;
    //     } else {
    //         end = (suit.rightViewPosition - end) > 0 ? drawwidth - Math.floor((suit.rightViewPosition - end) / 2) : drawwidth;
    //     }
    //     // if(end>drawwidth*2){
    //     //   end = (suit.rightViewPosition - end) > 0 ? drawwidth - Math.floor((suit.rightViewPosition - end) / 2) : drawwidth;
    //     // }else{
    //     //   end = Math.floor(end/2);
    //     // }
    //     // if(end >= drawwidth * 2){
    //     // }else{
    //     //   end = Math.floor(end/2);
    //     // }
    //     start = start - curstart > 0 ? start - curstart : 0;
    //     start = (start + 4) / 2
    //     const baseHeight = this.suit.height - 4
    //     // console.log('printts1',curstart, start/2, end);
    //     selectcontext.fillStyle = suit.ctgconfig.selectarea;
    //     // selectcontext.fillRect(start / 2, this.basetop, end - start / 2, suit.height - this.basetop);
    //     selectcontext.beginPath();
    //     selectcontext.strokeStyle = 'rgb(10, 10, 20)';
    //     selectcontext.lineWidth = 4;
    //     selectcontext.moveTo(start, this.basetop);
    //     selectcontext.lineTo(start, baseHeight);


    //     selectcontext.moveTo(start, baseHeight);
    //     selectcontext.lineTo(end, baseHeight);
    //     selectcontext.moveTo(end, this.basetop);
    //     selectcontext.lineTo(start, this.basetop);

    //     if (suit.selectend == 0) {
    //         selectcontext.moveTo(end, this.basetop);
    //         selectcontext.lineTo(end, baseHeight);
    //     }
    //     // console.log('printts2',curstart, start/2, end);
    //     selectcontext.stroke();
    //     this.suit.startingBar.setLeft(start - 2, false)
    //     this.suit.endingBar.setLeft(end - 2, false)

    //     const leftEdge = this.suit.leftViewposition - 240
    //     const rightEdge = this.suit.rightViewPosition + 240

    //     if (this.suit.selectrpstart <= leftEdge || this.suit.selectrpstart >= rightEdge) {
    //         this.suit.startingBar.setVisibility(false)
    //     } else {
    //         this.suit.startingBar.setVisibility(this.suit.selectflag)
    //     }
    //     if (this.suit.selectrpend <= leftEdge || this.suit.selectrpend >= rightEdge) {
    //         this.suit.endingBar.setVisibility(false)
    //     } else {
    //         this.suit.endingBar.setVisibility(this.suit.selectflag)
    //     }
    // };

}
