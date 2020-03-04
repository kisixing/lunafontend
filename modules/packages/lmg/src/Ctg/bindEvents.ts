import { Suit } from "./Suit";

export default function (this: Suit) {
    this
        .on('locking', value => {
            //更新状态
            // console.log('print_locking', value);
            this.drawSelect.selectflag = value;
            // if (this.selectflag) {
            //     this.startingBar.toggleVisibility();
            //     this.barTool.setBarWidth(0);
            //     this.selectend = 0;
            //     //this.endingBar.toggleVisibility();
            //     // console.log('print_lock', this.selectstart, this.data.index);
            //     this.selectrpstart = this.selectstart;
            //     this.selectrpend = this.data.index < this.selectrpstart + this.printlen ? this.data.index : this.selectrpstart + this.printlen
            //     this.drawobj.showselect();
            //     this.endingBar.setVisibility(false);
            //     this.emit('endTime', this.selectrpend);
            // } else {
            //     this.startingBar.toggleVisibility();
            //     //this.endingBar.toggleVisibility();
            //     this.endingBar.setVisibility(false);
            //     // console.log(this.selectstart, this.data.index);
            //     this.drawobj.showselect(0, 0);
            // }
            if (value) {
                this.drawSelect.startingBar.setVisibility(true)
                this.drawSelect.endingBar.setVisibility(true)
                this.drawSelect.selectingBar.setVisibility(false)

            } else {
                this.drawSelect.startingBar.setVisibility(false)
                this.drawSelect.endingBar.setVisibility(false)
                this.drawSelect.selectingBar.setVisibility(true)
            }
        })
        .on('customizing', value => {
            // this.log('customizing', value, this.selectrpend, this.rightViewPosition);
            if (value && this.drawSelect.selectflag) {
                this.drawSelect.selectend = 1;
                if (this.data.index < this.canvasline.width * 2) {
                    this.drawSelect.endingBar.setVisibility(true);
                    this.drawSelect.endingBar.setLeft(Math.floor(this.rightViewPosition / 2));
                }
                else if (this.rightViewPosition - this.drawSelect.selectrpend >= 0) {
                    this.drawSelect.endingBar.setVisibility(true);
                    this.drawSelect.endingBar.setLeft(this.canvasline.width - Math.floor((this.rightViewPosition - this.drawSelect.selectrpend) / 2));
                }
            } else {
                this.drawSelect.selectend = 0;
                this.drawSelect.endingBar.setVisibility(false);
                this.drawSelect.showselect()
            }
        })
        .on('setStartingTime', value => {
            // this.log('setStartingTime', value);

        })
        .on('setEndingTime', value => {
            // this.log('setEndingTime', value);

        })
        .on('showLine', () => {
            this.createLine()
        })
        .on('selectAll', () => {
            this.drawSelect.$selectrpend = this.data.index - 2
            this.drawSelect.$selectrpstart = 0
        })
        .on('selectForward', () => {
            const { selectingBar } = this.drawSelect
            const hasMoved = selectingBar.hasMoved
            console.log('hasMoved', hasMoved)
            // if (selectrpstart - baseViewposition < ctgconfig.print_interval * 240) {
            //     this.selectrpstart = baseViewposition + ctgconfig.print_interval * 240
            // }
            this.drawSelect.selectBasedOnStartingBar(false)

            this.updateBarTool()
            this.drawSelect.showselect()


        })
        .on('selectBackward', () => {
            const { selectingBar } = this.drawSelect
            const hasMoved = selectingBar.hasMoved
            console.log('hasMoved', hasMoved)
            // if (selectrpstart - baseViewposition < ctgconfig.print_interval * 240) {
            //     this.selectrpstart = baseViewposition + ctgconfig.print_interval * 240
            // }
            this.drawSelect.selectBasedOnStartingBar()
            this.drawSelect.showselect()
            this.updateBarTool()
        })
    this.log(this)
}