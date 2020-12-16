
const autoCompletefunc = ({root, renderOption, optionSelect, inputValue, fetchData}) =>{
  
root.innerHTML = `
<label><b>Enter the name</b></label>
<input class="input" />
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results"></div>
</div

</div
`;
const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapp  = root.querySelector('.results');

const onInput = async event => {
 const items= await fetchData(event.target.value);

 if (!items.length){
   dropdown.classList.remove('is-active');
   return;
 }
 resultsWrapp.innerHTML = '';
  dropdown.classList.add ('is-active');
   
 for (let item of items){
   const linkElement = document.createElement('a');
   linkElement.classList.add('dropdown-item');

   linkElement.innerHTML= renderOption(item);
   linkElement.addEventListener('click', () =>{
   dropdown.classList.remove('is-active');
   input.value=inputValue(item);
   optionSelect(item);
   });
   
   resultsWrapp.appendChild(linkElement);
 }
 
};
input.addEventListener('input', debounce(onInput));
document.addEventListener('click', event => {
   if(!root.contains(event.target)){
     dropdown.classList.remove('is-active'); 
   } 
});
}