import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@material-ui/core/Badge';

export const ShoppingIcon = ({ count, Link, PATHS }) => {
    return (
        <Link to={PATHS.CART} className="text-decoration-none me-4">
            {
                count === 0 ? <ShoppingCartIcon style={{ color: "white" }}></ShoppingCartIcon> :
                    <Badge badgeContent={count} color="secondary"> <ShoppingCartIcon style={{ color: "white" }}></ShoppingCartIcon> </Badge>
            }
        </Link>
    )
}