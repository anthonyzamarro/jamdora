const unslug = (link)  => {
    if (link != '') {
        const sluggedLocation = link.match(/(?<=\d{4}-)[^\.]+/)[0];
        console.log('unslug', sluggedLocation);
    }
}

export default unslug;
