import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>Preact App</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/profile">Me</Link>
			<Link activeClassName={style.active} href="/profile/john">John</Link>
			<Link activeClassName={style.active} href="/riders/motoe">MotoE</Link>
			<Link activeClassName={style.active} href="/riders/moto3">Moto3</Link>
			<Link activeClassName={style.active} href="/riders/moto2">Moto2</Link>
			<Link activeClassName={style.active} href="/riders/motogp">MotoGP</Link>
			<Link activeClassName={style.active} href="/riders">All Riders</Link>
		</nav>
	</header>
);

export default Header;
