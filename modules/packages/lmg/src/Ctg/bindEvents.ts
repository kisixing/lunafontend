import { Suit } from "./Suit";

export default function (this: Suit) {
    this
        .on('locking', value => {
            //更新状态
            // console.log('print_locking', value);
            this.selectflag = value;
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
                this.startingBar.setVisibility(true)
                this.endingBar.setVisibility(true)
                this.selectingBar.setVisibility(false)

            } else {
                this.startingBar.setVisibility(false)
                this.endingBar.setVisibility(false)
                this.selectingBar.setVisibility(true)
            }
        })
        .on('customizing', value => {
            // this.log('customizing', value, this.selectrpend, this.viewposition);
            if (value && this.selectflag) {
                this.selectend = 1;
                if (this.data.index < this.canvasline.width * 2) {
                    this.endingBar.setVisibility(true);
                    this.endingBar.setLeft(Math.floor(this.viewposition / 2));
                }
                else if (this.viewposition - this.selectrpend >= 0) {
                    this.endingBar.setVisibility(true);
                    this.endingBar.setLeft(this.canvasline.width - Math.floor((this.viewposition - this.selectrpend) / 2));
                }
            } else {
                this.selectend = 0;
                this.endingBar.setVisibility(false);
                this.drawobj.showselect()
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
            this.$selectrpend = this.data.index - 2
            this.$selectrpstart = 0
        })
        .on('selectForward', () => {
            const { selectingBar } = this
            const hasMoved = selectingBar.hasMoved
            console.log('hasMoved', hasMoved)
            // if (selectrpstart - baseViewposition < ctgconfig.print_interval * 240) {
            //     this.selectrpstart = baseViewposition + ctgconfig.print_interval * 240
            // }
            this.selectBasedOnStartingBar(false)

            this.updateBarTool()
            this.drawobj.showselect()


        })
        .on('selectBackward', () => {
            const { selectingBar } = this
            const hasMoved = selectingBar.hasMoved
            console.log('hasMoved', hasMoved)
            // if (selectrpstart - baseViewposition < ctgconfig.print_interval * 240) {
            //     this.selectrpstart = baseViewposition + ctgconfig.print_interval * 240
            // }
            this.selectBasedOnStartingBar()
            this.drawobj.showselect()
            this.updateBarTool()
        })
    this.log(this)
}