export default function AuthTwo() {
    return <div className="auth-two">
            {[... new Array(6)].map(index => {
                return <label htmlFor={`no-${index + 1}`}><input id={`no-${index + 1}`} required/></label>
            })}
            <div className="code-block"><label htmlFor="no-one"><input id="no-one" required/></label></div>
        </div>
}
