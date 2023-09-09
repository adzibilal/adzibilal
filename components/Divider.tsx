import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrush, faCode, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Divider() {
    return (
        <section className="relative h-[200px] overflow-hidden">
            <div className="bg-gradient-to-r from-blue to-purple w-full h-[100px] absolute rotate-1 scale-110 top-8 max-sm:h-[65px]"></div>
            <div className="bg-white-primary shadow-lg w-full h-[100px] absolute -rotate-1 scale-110 top-8 flex items-center justify-center gap-10 max-sm:h-[60px] max-sm:gap-5">
                <p className="text-divider">DESIGN</p>
                <p className="text-divider"><FontAwesomeIcon icon={faBrush}/></p>
                <p className="text-divider">DEVELOP</p>
                <p className="text-divider"><FontAwesomeIcon icon={faCode}/></p>
                <p className="text-divider">DISCOVER</p>
                <p className="text-divider"><FontAwesomeIcon icon={faMagnifyingGlass}/></p>
                <p className="text-divider">DESIGN</p>
                <p className="text-divider"><FontAwesomeIcon icon={faBrush}/></p>
                <p className="text-divider">DEVELOP</p>
                <p className="text-divider"><FontAwesomeIcon icon={faCode}/></p>
                <p className="text-divider">DISCOVER</p>
                <p className="text-divider"><FontAwesomeIcon icon={faMagnifyingGlass}/></p>
                <p className="text-divider">DESIGN</p>
                <p className="text-divider"><FontAwesomeIcon icon={faBrush}/></p>
                <p className="text-divider">DEVELOP</p>
                <p className="text-divider"><FontAwesomeIcon icon={faCode}/></p>
                <p className="text-divider">DISCOVER</p>
                <p className="text-divider"><FontAwesomeIcon icon={faMagnifyingGlass}/></p>
                <p className="text-divider">DESIGN</p>
                <p className="text-divider"><FontAwesomeIcon icon={faBrush}/></p>
                <p className="text-divider">DEVELOP</p>
                <p className="text-divider"><FontAwesomeIcon icon={faCode}/></p>
                <p className="text-divider">DISCOVER</p>
                <p className="text-divider"><FontAwesomeIcon icon={faMagnifyingGlass}/></p>
            </div>
        </section>
    )
}