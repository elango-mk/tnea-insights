function switchTabs(element)
{
    const panels = {'allotment':'allotment-pane', 'info':'info-pane'};

    //left-icon handling
    $('.left-bar-item.active-tab').toggleClass('active-tab');
    $(element).toggleClass('active-tab');

    //panel-handling
    const elementId = $(element).attr('id');
    console.log(elementId);

    $('.data-panel.active-panel').removeClass('active-panel').hide();    
    $(`.data-panel#${panels[elementId]}`).addClass('active-panel').show();

    
}