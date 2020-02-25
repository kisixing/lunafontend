import { useEffect, useState } from "react";
import { IConn } from "../types/conn";



export const useRoster = (isOpen: boolean, conn: IConn) => {
    const [friends, setFriends] = useState<string[]>([])


    useEffect(() => {
        isOpen && conn.getRoster({
            success(data) {
                if (!data) return
                console.log('getRoster success ', data)
                const friend = data.filter(d => d.subscription !== 'none').map(d => d.name)
                setFriends(friend)

            }
        })
    }, [isOpen, conn])
    // let history: any = window.history;

    return { friends }

}