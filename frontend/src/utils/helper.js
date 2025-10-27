import moment from "moment"
import toast from "react-hot-toast"

export const validateLoginForm = (email, password) => {
    if (!email.trim()) return toast.error("Email is required")
    if (!password.trim()) return toast.error("Password is required")
    return true
}

export const validateSingUpForm = (fullName, email, password) => {
    if (!fullName.trim()) return toast.error("Full name is required")
    if (!email.trim()) return toast.error("Email is required")
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid email format");
    if (!password.trim()) return toast.error("Password is required")
    return true
}

export const getInitials = (name) => {
    if (!name) return "";
    let words = name.split(' ')
    let initials = ''
    if (words.length > 1) {
        for (let word of words) {
            initials += word.charAt(0)
        }
    } else {
        initials = words[0].charAt(0);
    }
    return initials;
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data?.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        category: item?.category,
        amount: item?.amount
    }))
    return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
    // const sortedData = [...data]?.sort((a, b) => new Date(a.date) - new Date(b.date))
    const chartData = data?.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source
    }))
    return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
    // const sortedData = [...data]?.sort((a, b) => new Date(a.date) - new Date(b.date))
    const chartData = data?.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category
    }))
    return chartData
}